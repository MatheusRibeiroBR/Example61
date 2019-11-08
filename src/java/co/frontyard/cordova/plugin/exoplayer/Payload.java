package co.frontyard.cordova.plugin.exoplayer;

import android.view.KeyEvent;
import android.view.MotionEvent;
import com.google.android.exoplayer2.ExoPlaybackException;
import com.google.android.exoplayer2.ExoPlayer;
import com.google.android.exoplayer2.Timeline;
import com.google.android.exoplayer2.Timeline.Period;
import java.util.HashMap;
import java.util.Map;
import org.json.JSONObject;

public class Payload {
   private static void addPlayerState(Map var0, ExoPlayer var1) {
      if (var1 != null) {
         var0.put("duration", Long.toString(var1.getDuration()));
         var0.put("position", Long.toString(var1.getCurrentPosition()));
         var0.put("playWhenReady", Boolean.toString(var1.getPlayWhenReady()));
         var0.put("playbackState", playbackStateToString(var1.getPlaybackState()));
         var0.put("bufferPercentage", Integer.toString(var1.getBufferedPercentage()));
      }

   }

   public static JSONObject audioFocusEvent(ExoPlayer var0, String var1) {
      HashMap var2 = new HashMap();
      var2.put("eventType", "AUDIO_FOCUS_EVENT");
      var2.put("audioFocus", var1);
      addPlayerState(var2, var0);
      return new JSONObject(var2);
   }

   public static JSONObject keyEvent(KeyEvent var0) {
      int var1 = var0.getAction();
      HashMap var2 = new HashMap();
      var2.put("eventType", "KEY_EVENT");
      String var7;
      if (var1 == 0) {
         var7 = "ACTION_DOWN";
      } else if (var1 == 1) {
         var7 = "ACTION_UP";
      } else {
         StringBuilder var4 = new StringBuilder();
         var4.append("");
         var4.append(var1);
         var7 = var4.toString();
      }

      var2.put("eventAction", var7);
      var2.put("eventKeycode", KeyEvent.keyCodeToString(var0.getKeyCode()));
      return new JSONObject(var2);
   }

   public static JSONObject loadingEvent(ExoPlayer var0, boolean var1) {
      HashMap var2 = new HashMap();
      var2.put("eventType", "LOADING_EVENT");
      var2.put("loading", Boolean.toString(var1));
      addPlayerState(var2, var0);
      return new JSONObject(var2);
   }

   private static String playbackStateToString(int var0) {
      switch(var0) {
      case 1:
         return "STATE_IDLE";
      case 2:
         return "STATE_BUFFERING";
      case 3:
         return "STATE_READY";
      case 4:
         return "STATE_ENDED";
      default:
         return "UNKNOWN";
      }
   }

   public static JSONObject playerErrorEvent(ExoPlayer var0, ExoPlaybackException var1, String var2) {
      HashMap var3 = new HashMap();
      var3.put("eventType", "PLAYER_ERROR_EVENT");
      int var5 = 0;
      if (var1 != null) {
         int var11;
         for(var11 = ((ExoPlaybackException)var1).type; ((Throwable)var1).getCause() != null; var1 = ((Throwable)var1).getCause()) {
         }

         ((Throwable)var1).fillInStackTrace();
         StringBuffer var13 = new StringBuffer();
         if (var1 != null) {
            StackTraceElement[] var16 = ((Throwable)var1).getStackTrace();
            if (var16 != null) {
               int var17 = var16.length;
               int var18 = 0;
               if (var17 > 0) {
                  while(var18 < var16.length) {
                     StackTraceElement var19 = var16[var18];
                     StringBuilder var20 = new StringBuilder();
                     var20.append(var19.getClassName());
                     var20.append("#");
                     var20.append(var19.getMethodName());
                     var20.append("@");
                     var20.append(var19.getLineNumber());
                     String var26;
                     if (var19.isNativeMethod()) {
                        var26 = " NATIVE";
                     } else {
                        var26 = "";
                     }

                     var20.append(var26);
                     var13.append(var20.toString());
                     var13.append("\n");
                     ++var18;
                  }
               }
            }
         }

         var3.put("stackTrace", var13.toString());
         var3.put("errorMessage", ((Throwable)var1).getMessage());
         var5 = var11;
      }

      if (var2 != null) {
         var3.put("customMessage", var2);
      }

      switch(var5) {
      case 0:
         var3.put("errorType", "SOURCE");
         break;
      case 1:
         var3.put("errorType", "RENDERER");
         break;
      case 2:
         var3.put("errorType", "UNEXPECTED");
         break;
      default:
         var3.put("errorType", "UNKNOWN");
      }

      return new JSONObject(var3);
   }

   public static JSONObject positionDiscontinuityEvent(ExoPlayer var0) {
      HashMap var1 = new HashMap();
      var1.put("eventType", "POSITION_DISCONTINUITY_EVENT");
      addPlayerState(var1, var0);
      return new JSONObject(var1);
   }

   public static JSONObject seekEvent(ExoPlayer var0, long var1) {
      HashMap var3 = new HashMap();
      var3.put("eventType", "SEEK_EVENT");
      var3.put("offset", Long.toString(var1));
      addPlayerState(var3, var0);
      return new JSONObject(var3);
   }

   public static JSONObject startEvent(ExoPlayer var0, String var1) {
      HashMap var2 = new HashMap();
      var2.put("eventType", "START_EVENT");
      var2.put("audioFocus", var1);
      addPlayerState(var2, var0);
      return new JSONObject(var2);
   }

   public static JSONObject stateEvent(ExoPlayer var0, int var1, boolean var2) {
      HashMap var3 = new HashMap();
      var3.put("eventType", "STATE_CHANGED_EVENT");
      addPlayerState(var3, var0);
      var3.put("playbackState", playbackStateToString(var1));
      var3.put("controllerVisible", Boolean.toString(var2));
      return new JSONObject(var3);
   }

   public static JSONObject stopEvent(ExoPlayer var0) {
      HashMap var1 = new HashMap();
      var1.put("eventType", "STOP_EVENT");
      return new JSONObject(var1);
   }

   public static JSONObject timelineChangedEvent(ExoPlayer var0, Timeline var1, Object var2) {
      HashMap var3 = new HashMap();
      var3.put("eventType", "TIMELINE_EVENT");
      int var5 = var1.getPeriodCount();

      for(int var6 = 0; var6 < var5; ++var6) {
         Period var7 = new Period();
         var1.getPeriod(var6, var7);
         StringBuilder var9 = new StringBuilder();
         var9.append("periodDuration");
         var9.append(var6);
         var3.put(var9.toString(), Long.toString(var7.getDurationMs()));
         StringBuilder var13 = new StringBuilder();
         var13.append("periodWindowPosition");
         var13.append(var6);
         var3.put(var13.toString(), Long.toString(var7.getPositionInWindowMs()));
      }

      addPlayerState(var3, var0);
      return new JSONObject(var3);
   }

   public static JSONObject touchEvent(MotionEvent var0) {
      int var1 = var0.getAction();
      HashMap var2 = new HashMap();
      var2.put("eventType", "TOUCH_EVENT");
      String var7;
      if (var1 == 0) {
         var7 = "ACTION_DOWN";
      } else if (var1 == 1) {
         var7 = "ACTION_UP";
      } else if (var1 == 2) {
         var7 = "ACTION_MOVE";
      } else {
         StringBuilder var4 = new StringBuilder();
         var4.append("");
         var4.append(var1);
         var7 = var4.toString();
      }

      var2.put("eventAction", var7);
      var2.put("eventAxisX", Float.toString(var0.getX()));
      var2.put("eventAxisY", Float.toString(var0.getY()));
      return new JSONObject(var2);
   }
}
