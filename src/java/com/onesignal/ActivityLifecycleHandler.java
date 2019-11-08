package com.onesignal;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.res.Configuration;
import android.os.Handler;
import android.os.HandlerThread;
import android.os.Looper;
import android.os.Build.VERSION;
import android.support.annotation.NonNull;
import android.view.ViewTreeObserver;
import android.view.ViewTreeObserver.OnGlobalLayoutListener;
import com.onesignal.OSSystemConditionController.OSSystemConditionObserver;
import com.onesignal.OneSignal.LOG_LEVEL;
import java.lang.ref.WeakReference;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;
import java.util.concurrent.ConcurrentHashMap;

class ActivityLifecycleHandler {
   @SuppressLint({"StaticFieldLeak"})
   static Activity curActivity;
   static ActivityLifecycleHandler.FocusHandlerThread focusHandlerThread = new ActivityLifecycleHandler.FocusHandlerThread();
   static boolean nextResumeIsFirstActivity;
   private static Map sActivityAvailableListeners = new ConcurrentHashMap();
   private static Map sKeyboardListeners = new ConcurrentHashMap();
   private static Map sSystemConditionObservers = new ConcurrentHashMap();

   private static void handleFocus() {
      if (!focusHandlerThread.hasBackgrounded() && !nextResumeIsFirstActivity) {
         focusHandlerThread.stopScheduledRunnable();
      } else {
         nextResumeIsFirstActivity = false;
         focusHandlerThread.resetBackgroundState();
         OneSignal.onAppFocus();
      }
   }

   private static void handleLostFocus() {
      focusHandlerThread.runRunnable(new ActivityLifecycleHandler.AppFocusRunnable());
   }

   private static void logCurActivity() {
      LOG_LEVEL var0 = LOG_LEVEL.DEBUG;
      StringBuilder var1 = new StringBuilder();
      var1.append("curActivity is NOW: ");
      String var8;
      if (curActivity != null) {
         StringBuilder var3 = new StringBuilder();
         var3.append("");
         var3.append(curActivity.getClass().getName());
         var3.append(":");
         var3.append(curActivity);
         var8 = var3.toString();
      } else {
         var8 = "null";
      }

      var1.append(var8);
      OneSignal.Log(var0, var1.toString());
   }

   private static void logOrientationChange(int var0) {
      if (var0 == 2) {
         LOG_LEVEL var6 = LOG_LEVEL.DEBUG;
         StringBuilder var7 = new StringBuilder();
         var7.append("Configuration Orientation Change: LANDSCAPE (");
         var7.append(var0);
         var7.append(")");
         OneSignal.onesignalLog(var6, var7.toString());
      } else {
         if (var0 == 1) {
            LOG_LEVEL var1 = LOG_LEVEL.DEBUG;
            StringBuilder var2 = new StringBuilder();
            var2.append("Configuration Orientation Change: PORTRAIT (");
            var2.append(var0);
            var2.append(")");
            OneSignal.onesignalLog(var1, var2.toString());
         }

      }
   }

   static void onActivityCreated(Activity var0) {
   }

   static void onActivityDestroyed(Activity var0) {
      LOG_LEVEL var1 = LOG_LEVEL.DEBUG;
      StringBuilder var2 = new StringBuilder();
      var2.append("onActivityDestroyed: ");
      var2.append(var0);
      OneSignal.Log(var1, var2.toString());
      sKeyboardListeners.clear();
      if (var0 == curActivity) {
         curActivity = null;
         handleLostFocus();
      }

      logCurActivity();
   }

   static void onActivityPaused(Activity var0) {
      if (var0 == curActivity) {
         curActivity = null;
         handleLostFocus();
      }

      logCurActivity();
   }

   static void onActivityResumed(Activity var0) {
      setCurActivity(var0);
      logCurActivity();
      handleFocus();
   }

   static void onActivityStarted(Activity var0) {
   }

   static void onActivityStopped(Activity var0) {
      LOG_LEVEL var1 = LOG_LEVEL.DEBUG;
      StringBuilder var2 = new StringBuilder();
      var2.append("onActivityStopped: ");
      var2.append(var0);
      OneSignal.Log(var1, var2.toString());
      if (var0 == curActivity) {
         curActivity = null;
         handleLostFocus();
      }

      Iterator var5 = sActivityAvailableListeners.entrySet().iterator();

      while(var5.hasNext()) {
         ((ActivityLifecycleHandler.ActivityAvailableListener)((Entry)var5.next()).getValue()).stopped(new WeakReference(var0));
      }

      logCurActivity();
   }

   static void onConfigurationChanged(Configuration var0) {
      Activity var1 = curActivity;
      if (var1 != null && OSUtils.hasConfigChangeFlag(var1, 128)) {
         logOrientationChange(var0.orientation);
         onOrientationChanged();
      }

   }

   private static void onOrientationChanged() {
      handleLostFocus();
      Iterator var0 = sActivityAvailableListeners.entrySet().iterator();

      while(var0.hasNext()) {
         ((ActivityLifecycleHandler.ActivityAvailableListener)((Entry)var0.next()).getValue()).stopped(new WeakReference(curActivity));
      }

      Iterator var1 = sActivityAvailableListeners.entrySet().iterator();

      while(var1.hasNext()) {
         ((ActivityLifecycleHandler.ActivityAvailableListener)((Entry)var1.next()).getValue()).available(curActivity);
      }

      ViewTreeObserver var2 = curActivity.getWindow().getDecorView().getViewTreeObserver();
      Iterator var3 = sSystemConditionObservers.entrySet().iterator();

      while(var3.hasNext()) {
         Entry var4 = (Entry)var3.next();
         ActivityLifecycleHandler.KeyboardListener var5 = new ActivityLifecycleHandler.KeyboardListener((OSSystemConditionObserver)var4.getValue(), (String)var4.getKey());
         var2.addOnGlobalLayoutListener(var5);
         sKeyboardListeners.put(var4.getKey(), var5);
      }

      handleFocus();
   }

   static void removeActivityAvailableListener(String var0) {
      sActivityAvailableListeners.remove(var0);
   }

   static void removeSystemConditionObserver(String var0) {
      sKeyboardListeners.remove(var0);
      sSystemConditionObservers.remove(var0);
   }

   static void setActivityAvailableListener(String var0, ActivityLifecycleHandler.ActivityAvailableListener var1) {
      sActivityAvailableListeners.put(var0, var1);
      Activity var3 = curActivity;
      if (var3 != null) {
         var1.available(var3);
      }

   }

   private static void setCurActivity(Activity var0) {
      curActivity = var0;
      Iterator var1 = sActivityAvailableListeners.entrySet().iterator();

      while(var1.hasNext()) {
         ((ActivityLifecycleHandler.ActivityAvailableListener)((Entry)var1.next()).getValue()).available(curActivity);
      }

      ViewTreeObserver var2 = curActivity.getWindow().getDecorView().getViewTreeObserver();
      Iterator var3 = sSystemConditionObservers.entrySet().iterator();

      while(var3.hasNext()) {
         Entry var4 = (Entry)var3.next();
         ActivityLifecycleHandler.KeyboardListener var5 = new ActivityLifecycleHandler.KeyboardListener((OSSystemConditionObserver)var4.getValue(), (String)var4.getKey());
         var2.addOnGlobalLayoutListener(var5);
         sKeyboardListeners.put(var4.getKey(), var5);
      }

   }

   static void setSystemConditionObserver(String var0, OSSystemConditionObserver var1) {
      Activity var2 = curActivity;
      if (var2 != null) {
         ViewTreeObserver var4 = var2.getWindow().getDecorView().getViewTreeObserver();
         ActivityLifecycleHandler.KeyboardListener var5 = new ActivityLifecycleHandler.KeyboardListener(var1, var0);
         var4.addOnGlobalLayoutListener(var5);
         sKeyboardListeners.put(var0, var5);
      }

      sSystemConditionObservers.put(var0, var1);
   }

   abstract static class ActivityAvailableListener {
      void available(@NonNull Activity var1) {
      }

      void stopped(WeakReference var1) {
      }
   }

   private static class AppFocusRunnable implements Runnable {
      private boolean backgrounded;
      private boolean completed;

      private AppFocusRunnable() {
      }

      // $FF: synthetic method
      AppFocusRunnable(Object var1) {
         this();
      }

      public void run() {
         if (ActivityLifecycleHandler.curActivity == null) {
            this.backgrounded = true;
            OneSignal.onAppLostFocus();
            this.completed = true;
         }
      }
   }

   static class FocusHandlerThread extends HandlerThread {
      private ActivityLifecycleHandler.AppFocusRunnable appFocusRunnable;
      private Handler mHandler;

      FocusHandlerThread() {
         super("FocusHandlerThread");
         this.start();
         this.mHandler = new Handler(this.getLooper());
      }

      Looper getHandlerLooper() {
         return this.mHandler.getLooper();
      }

      boolean hasBackgrounded() {
         ActivityLifecycleHandler.AppFocusRunnable var1 = this.appFocusRunnable;
         return var1 != null && var1.backgrounded;
      }

      void resetBackgroundState() {
         ActivityLifecycleHandler.AppFocusRunnable var1 = this.appFocusRunnable;
         if (var1 != null) {
            var1.backgrounded = false;
         }

      }

      void runRunnable(ActivityLifecycleHandler.AppFocusRunnable var1) {
         ActivityLifecycleHandler.AppFocusRunnable var2 = this.appFocusRunnable;
         if (var2 == null || !var2.backgrounded || this.appFocusRunnable.completed) {
            this.appFocusRunnable = var1;
            this.mHandler.removeCallbacksAndMessages((Object)null);
            this.mHandler.postDelayed(var1, 2000L);
         }
      }

      void stopScheduledRunnable() {
         this.mHandler.removeCallbacksAndMessages((Object)null);
      }
   }

   private static class KeyboardListener implements OnGlobalLayoutListener {
      private final String key;
      private final OSSystemConditionObserver observer;

      private KeyboardListener(OSSystemConditionObserver var1, String var2) {
         this.observer = var1;
         this.key = var2;
      }

      // $FF: synthetic method
      KeyboardListener(OSSystemConditionObserver var1, String var2, Object var3) {
         this(var1, var2);
      }

      public void onGlobalLayout() {
         if (!OSViewUtils.isKeyboardUp(new WeakReference(ActivityLifecycleHandler.curActivity))) {
            if (ActivityLifecycleHandler.curActivity != null) {
               ViewTreeObserver var1 = ActivityLifecycleHandler.curActivity.getWindow().getDecorView().getViewTreeObserver();
               if (VERSION.SDK_INT < 16) {
                  var1.removeGlobalOnLayoutListener(this);
               } else {
                  var1.removeOnGlobalLayoutListener(this);
               }
            }

            ActivityLifecycleHandler.removeSystemConditionObserver(this.key);
            this.observer.messageTriggerConditionChanged();
         }

      }
   }
}
