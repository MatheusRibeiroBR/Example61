package com.mesmotronic.plugins;

import android.app.Activity;
import android.graphics.Point;
import android.os.Handler;
import android.os.Build.VERSION;
import android.view.View;
import android.view.Window;
import android.view.View.OnFocusChangeListener;
import android.view.View.OnSystemUiVisibilityChangeListener;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.PluginResult;
import org.apache.cordova.PluginResult.Status;
import org.json.JSONArray;
import org.json.JSONException;

public class FullScreenPlugin extends CordovaPlugin {
   public static final String ACTION_IMMERSIVE_HEIGHT = "immersiveHeight";
   public static final String ACTION_IMMERSIVE_MODE = "immersiveMode";
   public static final String ACTION_IMMERSIVE_WIDTH = "immersiveWidth";
   public static final String ACTION_IS_IMMERSIVE_MODE_SUPPORTED = "isImmersiveModeSupported";
   public static final String ACTION_IS_SUPPORTED = "isSupported";
   public static final String ACTION_LEAN_MODE = "leanMode";
   public static final String ACTION_SET_SYSTEM_UI_VISIBILITY = "setSystemUiVisibility";
   public static final String ACTION_SHOW_SYSTEM_UI = "showSystemUI";
   public static final String ACTION_SHOW_UNDER_STATUS_BAR = "showUnderStatusBar";
   public static final String ACTION_SHOW_UNDER_SYSTEM_UI = "showUnderSystemUI";
   private Activity activity;
   private CallbackContext context;
   private View decorView;
   private final Runnable mEnterLeanback = new Runnable() {
      public void run() {
         FullScreenPlugin.this.leanMode();
      }
   };
   private int mLastSystemUIVisibility = 0;
   private final Handler mLeanBackHandler = new Handler();
   private Window window;

   private void resetHideTimer() {
      this.mLeanBackHandler.removeCallbacks(this.mEnterLeanback);
      this.mLeanBackHandler.postDelayed(this.mEnterLeanback, 3000L);
   }

   private void setStatusBarBackgroundColor(String param1) {
      // $FF: Couldn't be decompiled
   }

   public boolean execute(String var1, JSONArray var2, CallbackContext var3) throws JSONException {
      this.context = var3;
      this.activity = this.cordova.getActivity();
      this.window = this.activity.getWindow();
      this.decorView = this.window.getDecorView();
      if ("isSupported".equals(var1)) {
         return this.isSupported();
      } else if ("isImmersiveModeSupported".equals(var1)) {
         return this.isImmersiveModeSupported();
      } else if ("immersiveWidth".equals(var1)) {
         return this.immersiveWidth();
      } else if ("immersiveHeight".equals(var1)) {
         return this.immersiveHeight();
      } else if ("leanMode".equals(var1)) {
         return this.leanMode();
      } else if ("showSystemUI".equals(var1)) {
         return this.showSystemUI();
      } else if ("showUnderStatusBar".equals(var1)) {
         return this.showUnderStatusBar();
      } else if ("showUnderSystemUI".equals(var1)) {
         return this.showUnderSystemUI();
      } else if ("immersiveMode".equals(var1)) {
         return this.immersiveMode();
      } else {
         return "setSystemUiVisibility".equals(var1) ? this.setSystemUiVisibility(var2.getInt(0)) : false;
      }
   }

   protected boolean immersiveHeight() {
      this.activity.runOnUiThread(new Runnable() {
         public void run() {
            try {
               Point var1 = new Point();
               FullScreenPlugin.this.decorView.getDisplay().getRealSize(var1);
               PluginResult var3 = new PluginResult(Status.OK, var1.y);
               FullScreenPlugin.this.context.sendPluginResult(var3);
            } catch (Exception var4) {
               FullScreenPlugin.this.context.error(var4.getMessage());
            }
         }
      });
      return true;
   }

   protected boolean immersiveMode() {
      if (!this.isImmersiveModeSupported()) {
         this.context.error("Not supported");
         return false;
      } else {
         this.activity.runOnUiThread(new Runnable() {
            public void run() {
               try {
                  FullScreenPlugin.this.resetWindow();
                  FullScreenPlugin.this.window.addFlags(1024);
                  FullScreenPlugin.this.decorView.setSystemUiVisibility(5894);
                  FullScreenPlugin.this.decorView.setOnFocusChangeListener(new OnFocusChangeListener() {
                     public void onFocusChange(View var1, boolean var2) {
                        if (var2) {
                           FullScreenPlugin.this.decorView.setSystemUiVisibility(5894);
                        }

                     }
                  });
                  FullScreenPlugin.this.decorView.setOnSystemUiVisibilityChangeListener(new OnSystemUiVisibilityChangeListener() {
                     public void onSystemUiVisibilityChange(int var1) {
                        FullScreenPlugin.this.decorView.setSystemUiVisibility(5894);
                     }
                  });
                  FullScreenPlugin.this.context.success();
               } catch (Exception var2) {
                  FullScreenPlugin.this.context.error(var2.getMessage());
               }
            }
         });
         return true;
      }
   }

   protected boolean immersiveWidth() {
      this.activity.runOnUiThread(new Runnable() {
         public void run() {
            try {
               Point var1 = new Point();
               FullScreenPlugin.this.decorView.getDisplay().getRealSize(var1);
               PluginResult var3 = new PluginResult(Status.OK, var1.x);
               FullScreenPlugin.this.context.sendPluginResult(var3);
            } catch (Exception var4) {
               FullScreenPlugin.this.context.error(var4.getMessage());
            }
         }
      });
      return true;
   }

   public void initialize(final CordovaInterface var1, CordovaWebView var2) {
      super.initialize(var1, var2);
      this.cordova.getActivity().runOnUiThread(new Runnable() {
         public void run() {
            var1.getActivity().getWindow().clearFlags(2048);
            FullScreenPlugin var1x = FullScreenPlugin.this;
            var1x.setStatusBarBackgroundColor(var1x.preferences.getString("StatusBarBackgroundColor", "#000000"));
         }
      });
   }

   protected boolean isImmersiveModeSupported() {
      boolean var1;
      if (VERSION.SDK_INT >= 19) {
         var1 = true;
      } else {
         var1 = false;
      }

      PluginResult var2 = new PluginResult(Status.OK, var1);
      this.context.sendPluginResult(var2);
      return var1;
   }

   protected boolean isSupported() {
      boolean var1;
      if (VERSION.SDK_INT >= 14) {
         var1 = true;
      } else {
         var1 = false;
      }

      PluginResult var2 = new PluginResult(Status.OK, var1);
      this.context.sendPluginResult(var2);
      return var1;
   }

   protected boolean leanMode() {
      if (!this.isSupported()) {
         this.context.error("Not supported");
         return false;
      } else {
         this.activity.runOnUiThread(new Runnable() {
            public void run() {
               try {
                  FullScreenPlugin.this.resetWindow();
                  FullScreenPlugin.this.mLastSystemUIVisibility = 1798;
                  FullScreenPlugin.this.decorView.setOnSystemUiVisibilityChangeListener(new OnSystemUiVisibilityChangeListener() {
                     public void onSystemUiVisibilityChange(int var1) {
                        if ((2 & FullScreenPlugin.this.mLastSystemUIVisibility) != 0 && (var1 & 2) == 0) {
                           FullScreenPlugin.this.resetHideTimer();
                        }

                        FullScreenPlugin.this.mLastSystemUIVisibility = var1;
                     }
                  });
                  FullScreenPlugin.this.decorView.setSystemUiVisibility(1798);
                  FullScreenPlugin.this.context.success();
               } catch (Exception var2) {
                  FullScreenPlugin.this.context.error(var2.getMessage());
               }
            }
         });
         return true;
      }
   }

   protected void resetWindow() {
      this.decorView.setOnFocusChangeListener((OnFocusChangeListener)null);
      this.decorView.setOnSystemUiVisibilityChangeListener((OnSystemUiVisibilityChangeListener)null);
      this.window.clearFlags(2048);
   }

   protected boolean setSystemUiVisibility(final int var1) {
      if (!this.isSupported()) {
         this.context.error("Not supported");
         return false;
      } else {
         this.activity.runOnUiThread(new Runnable() {
            public void run() {
               try {
                  FullScreenPlugin.this.resetWindow();
                  FullScreenPlugin.this.decorView.setSystemUiVisibility(var1);
                  FullScreenPlugin.this.context.success();
               } catch (Exception var2) {
                  FullScreenPlugin.this.context.error(var2.getMessage());
               }
            }
         });
         return true;
      }
   }

   protected boolean showSystemUI() {
      if (!this.isSupported()) {
         this.context.error("Not supported");
         return false;
      } else {
         this.activity.runOnUiThread(new Runnable() {
            public void run() {
               try {
                  FullScreenPlugin.this.resetWindow();
                  FullScreenPlugin.this.window.clearFlags(201327616);
                  FullScreenPlugin.this.decorView.setOnSystemUiVisibilityChangeListener((OnSystemUiVisibilityChangeListener)null);
                  FullScreenPlugin.this.decorView.setSystemUiVisibility(0);
                  PluginResult var2 = new PluginResult(Status.OK, true);
                  FullScreenPlugin.this.context.sendPluginResult(var2);
                  FullScreenPlugin.this.context.success();
               } catch (Exception var3) {
                  FullScreenPlugin.this.context.error(var3.getMessage());
               }
            }
         });
         return true;
      }
   }

   protected boolean showUnderStatusBar() {
      if (!this.isImmersiveModeSupported()) {
         this.context.error("Not supported");
         return false;
      } else {
         this.activity.runOnUiThread(new Runnable() {
            public void run() {
               try {
                  FullScreenPlugin.this.resetWindow();
                  FullScreenPlugin.this.window.setFlags(67108864, 67108864);
                  FullScreenPlugin.this.decorView.setSystemUiVisibility(1280);
                  FullScreenPlugin.this.context.success();
               } catch (Exception var2) {
                  FullScreenPlugin.this.context.error(var2.getMessage());
               }
            }
         });
         return true;
      }
   }

   protected boolean showUnderSystemUI() {
      if (!this.isImmersiveModeSupported()) {
         this.context.error("Not supported");
         return false;
      } else {
         this.activity.runOnUiThread(new Runnable() {
            public void run() {
               try {
                  FullScreenPlugin.this.resetWindow();
                  FullScreenPlugin.this.window.setFlags(134217728, 134217728);
                  FullScreenPlugin.this.window.setFlags(67108864, 67108864);
                  FullScreenPlugin.this.decorView.setSystemUiVisibility(768);
                  FullScreenPlugin.this.context.success();
               } catch (Exception var2) {
                  FullScreenPlugin.this.context.error(var2.getMessage());
               }
            }
         });
         return true;
      }
   }
}
