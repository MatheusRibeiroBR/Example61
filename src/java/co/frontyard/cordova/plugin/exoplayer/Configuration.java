package co.frontyard.cordova.plugin.exoplayer;

import android.net.Uri;
import org.json.JSONObject;

public class Configuration {
   static final String TAG = "ExoPlayerPlugin";
   private final JSONObject config;

   public Configuration(JSONObject var1) {
      this.config = var1;
   }

   public final JSONObject getController() {
      return this.config.optJSONObject("controller");
   }

   public final JSONObject getDimensions() {
      return this.config.optJSONObject("dimensions");
   }

   public int getForwardTimeMs() {
      return this.config.optInt("forwardTime", 60000);
   }

   public int getHideTimeout() {
      return this.config.optInt("hideTimeout", 5000);
   }

   public int getRewindTimeMs() {
      return this.config.optInt("rewindTime", 60000);
   }

   public long getSeekTo() {
      return this.config.optLong("seekTo", -1L);
   }

   public String getSubtitleUrl() {
      return this.config.optString("subtitleUrl", (String)null);
   }

   public final Uri getUri() {
      return Uri.parse(this.config.optString("url", ""));
   }

   public String getUserAgent() {
      return this.config.optString("userAgent", "ExoPlayerPlugin");
   }

   public boolean isAspectRatioFillScreen() {
      return this.config.optString("aspectRatio", "FIT_SCREEN").equalsIgnoreCase("FILL_SCREEN");
   }

   public boolean isAudioOnly() {
      return this.config.optBoolean("audioOnly");
   }
}
