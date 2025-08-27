import { db } from '@/components/firebase';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  getDocs,
  onSnapshot,
  Timestamp 
} from 'firebase/firestore';

export interface PillReminder {
  id?: string;
  userId: string;
  name: string;
  dosage: string;
  frequency: string;
  times: string[];
  stock: number;
  notes?: string;
  caregiverNotify: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface NotificationSettings {
  userId: string;
  browserNotifications: boolean;
  soundEnabled: boolean;
  reminderInterval: number; // in minutes
}

class NotificationService {
  private checkInterval: NodeJS.Timeout | null = null;
  private isInitialized = false;

  // Initialize notification service
  async initialize(userId: string) {
    if (this.isInitialized) return;
    
    this.isInitialized = true;
    
    // Request notification permission
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      console.log('Notification permission:', permission);
    }

    // Start checking for reminders
    this.startReminderCheck(userId);
  }

  // Start checking for pill reminders
  private startReminderCheck(userId: string) {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
    }

    this.checkInterval = setInterval(async () => {
      await this.checkPillReminders(userId);
    }, 60000); // Check every minute
  }

  // Check for pill reminders
  private async checkPillReminders(userId: string) {
    try {
      const now = new Date();
      const currentTime = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });

      const remindersRef = collection(db, 'pillReminders');
      const q = query(remindersRef, where('userId', '==', userId));
      
      const querySnapshot = await getDocs(q);
      
      querySnapshot.forEach((doc) => {
        const reminder = doc.data() as PillReminder;
        
        // Check if it's time for any of the scheduled times
        reminder.times.forEach((time) => {
          if (time === currentTime) {
            this.showPillReminder(reminder);
          }
        });
      });
    } catch (error) {
      console.error('Error checking pill reminders:', error);
    }
  }

  // Show pill reminder notification
  private showPillReminder(reminder: PillReminder) {
    // Browser notification
    if ('Notification' in window && Notification.permission === 'granted') {
      const notification = new Notification(`Time for ${reminder.name}`, {
        body: `Take ${reminder.dosage} now`,
        icon: '/pill-icon.png',
        tag: `pill-${reminder.id}`,
        requireInteraction: true,
      });

      // Auto close after 30 seconds
      setTimeout(() => {
        notification.close();
      }, 30000);

      // Handle notification click
      notification.onclick = () => {
        window.focus();
        notification.close();
      };
    }

    // Play sound if enabled
    this.playNotificationSound();

    // Show in-app notification
    this.showInAppNotification(reminder);
  }

  // Play notification sound
  private playNotificationSound() {
    try {
      const audio = new Audio('/notification-sound.mp3');
      audio.volume = 0.5;
      audio.play().catch(console.error);
    } catch (error) {
      console.error('Error playing notification sound:', error);
    }
  }

  // Show in-app notification
  private showInAppNotification(reminder: PillReminder) {
    // Create a custom notification element
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-blue-500 text-white p-4 rounded-lg shadow-lg z-50 max-w-sm';
    notification.innerHTML = `
      <div class="flex items-center justify-between">
        <div>
          <h4 class="font-bold">Pill Reminder</h4>
          <p>Time for ${reminder.name}</p>
          <p class="text-sm">Take ${reminder.dosage}</p>
        </div>
        <button onclick="this.parentElement.parentElement.remove()" class="text-white hover:text-gray-200">
          ✕
        </button>
      </div>
    `;

    document.body.appendChild(notification);

    // Auto remove after 10 seconds
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove();
      }
    }, 10000);
  }

  // Add new pill reminder
  async addPillReminder(reminder: Omit<PillReminder, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'pillReminders'), {
        ...reminder,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding pill reminder:', error);
      throw error;
    }
  }

  // Update pill reminder
  async updatePillReminder(id: string, updates: Partial<PillReminder>): Promise<void> {
    try {
      const docRef = doc(db, 'pillReminders', id);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error('Error updating pill reminder:', error);
      throw error;
    }
  }

  // Delete pill reminder
  async deletePillReminder(id: string): Promise<void> {
    try {
      const docRef = doc(db, 'pillReminders', id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting pill reminder:', error);
      throw error;
    }
  }

  // Get user's pill reminders
  async getPillReminders(userId: string): Promise<PillReminder[]> {
    try {
      const remindersRef = collection(db, 'pillReminders');
      const q = query(remindersRef, where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as PillReminder[];
    } catch (error) {
      console.error('Error getting pill reminders:', error);
      throw error;
    }
  }

  // Subscribe to real-time updates
  subscribeToReminders(userId: string, callback: (reminders: PillReminder[]) => void) {
    const remindersRef = collection(db, 'pillReminders');
    const q = query(remindersRef, where('userId', '==', userId));
    
    return onSnapshot(q, (querySnapshot) => {
      const reminders = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as PillReminder[];
      
      callback(reminders);
    });
  }

  // Cleanup
  cleanup() {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
    }
    this.isInitialized = false;
  }
}

export const notificationService = new NotificationService();
