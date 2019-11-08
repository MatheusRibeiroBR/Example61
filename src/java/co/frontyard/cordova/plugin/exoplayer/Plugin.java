package co.frontyard.cordova.plugin.exoplayer;

import android.app.Activity;
import android.net.Uri;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult.Status;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class Plugin extends CordovaPlugin {
   private Player player;

   public boolean execute(String var1, final JSONArray var2, final CallbackContext var3) throws JSONException {
      try {
         if (var1.equals("show")) {
            this.cordova.getActivity().runOnUiThread(new Runnable() {
               public void run() {
                  if (Plugin.this.player != null) {
                     Plugin.this.player.close();
                  }

                  JSONObject var1 = var2.optJSONObject(0);
                  Plugin.this.player = new Player(new Configuration(var1), Plugin.this.cordova.getActivity(), var3, Plugin.this.webView);
                  Plugin.this.player.createPlayer();
                  (new CallbackResponse(var3)).send(Status.NO_RESULT, true);
               }
            });
            return true;
         } else if (var1.equals("setStream")) {
            if (this.player == null) {
               return false;
            } else {
               final String var9 = var2.optString(0, (String)null);
               final JSONObject var10 = var2.optJSONObject(1);
               Activity var11 = this.cordova.getActivity();
               Runnable var12 = new Runnable() {
                  public void run() {
                     Plugin.this.player.setStream(Uri.parse(var9), var10);
                     (new CallbackResponse(var3)).send(Status.NO_RESULT, true);
                  }
               };
               var11.runOnUiThread(var12);
               return true;
            }
         } else if (var1.equals("playPause")) {
            if (this.player == null) {
               return false;
            } else {
               this.cordova.getActivity().runOnUiThread(new Runnable() {
                  public void run() {
                     Plugin.this.player.playPause();
                     (new CallbackResponse(var3)).send(Status.NO_RESULT, true);
                  }
               });
               return true;
            }
         } else if (var1.equals("stop")) {
            if (this.player == null) {
               return false;
            } else {
               this.cordova.getActivity().runOnUiThread(new Runnable() {
                  public void run() {
                     Plugin.this.player.stop();
                     (new CallbackResponse(var3)).send(Status.NO_RESULT, true);
                  }
               });
               return true;
            }
         } else if (var1.equals("seekTo")) {
            if (this.player == null) {
               return false;
            } else {
               final long var5 = var2.optLong(0, 0L);
               Activity var7 = this.cordova.getActivity();
               Runnable var8 = new Runnable() {
                  public void run() {
                     Plugin.this.player.seekTo(var5);
                     (new CallbackResponse(var3)).send(Status.NO_RESULT, true);
                  }
               };
               var7.runOnUiThread(var8);
               return true;
            }
         } else if (var1.equals("getState")) {
            if (this.player == null) {
               return false;
            } else {
               this.cordova.getThreadPool().execute(new Runnable() {
                  public void run() {
                     JSONObject var1 = Plugin.this.player.getPlayerState();
                     (new CallbackResponse(var3)).send(Status.OK, var1, false);
                  }
               });
               return true;
            }
         } else if (var1.equals("showController")) {
            if (this.player == null) {
               return false;
            } else {
               this.cordova.getActivity().runOnUiThread(new Runnable() {
                  public void run() {
                     Plugin.this.player.showController();
                     (new CallbackResponse(var3)).send(Status.NO_RESULT, true);
                  }
               });
               return true;
            }
         } else if (var1.equals("hideController")) {
            if (this.player == null) {
               return false;
            } else {
               this.cordova.getActivity().runOnUiThread(new Runnable() {
                  public void run() {
                     Plugin.this.player.hideController();
                     (new CallbackResponse(var3)).send(Status.NO_RESULT, true);
                  }
               });
               return true;
            }
         } else if (var1.equals("setController")) {
            if (this.player == null) {
               return false;
            } else {
               final JSONObject var4 = var2.optJSONObject(0);
               this.cordova.getActivity().runOnUiThread(new Runnable() {
                  public void run() {
                     Plugin.this.player.setController(var4);
                     (new CallbackResponse(var3)).send(Status.NO_RESULT, true);
                  }
               });
               return true;
            }
         } else if (var1.equals("close")) {
            if (this.player == null) {
               return false;
            } else {
               this.cordova.getActivity().runOnUiThread(new Runnable() {
                  public void run() {
                     Plugin.this.player.close();
                     (new CallbackResponse(var3)).send(Status.OK, false);
                  }
               });
               return true;
            }
         } else {
            (new CallbackResponse(var3)).send(Status.INVALID_ACTION, false);
            return false;
         }
      } catch (Exception var13) {
         (new CallbackResponse(var3)).send(Status.JSON_EXCEPTION, false);
         return false;
      }
   }
}
