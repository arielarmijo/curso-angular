package tk.monkeycode.spotiapp;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpRequest.BodyPublishers;
import java.net.http.HttpResponse;
import java.net.http.HttpResponse.BodyHandlers;
import java.util.HashMap;
import java.util.Map;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@SpringBootApplication
public class SpotiappApplication extends SpringBootServletInitializer {
	
	private static Class<SpotiappApplication> applicationClass = SpotiappApplication.class;
	
	@Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(applicationClass);
    }

	@GetMapping("/token")
	public ResponseEntity<?> getToken() {
		String url = "https://accounts.spotify.com/api/token";
		String body = "grant_type=client_credentials&client_id=962d0b01b538432681fb76a82cd6f677&client_secret=1eb0563499c24dff98d87926d85c86db";
		HttpRequest request = HttpRequest.newBuilder()
										 .uri(URI.create(url))
										 .headers("Content-Type", "application/x-www-form-urlencoded")
										 .POST(BodyPublishers.ofString(body))
										 .build();
		HttpClient client = HttpClient.newHttpClient();
		HttpResponse<?> response;
		try {
			response = client.send(request, BodyHandlers.ofString());
			return ResponseEntity.ok(response.body().toString());
		} catch (IOException | InterruptedException e) {
			e.printStackTrace();
			Map<String, String> bodys = new HashMap<>();
			bodys.put("token", "spotify");
			return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE.value()).build();
		}
	}
	
	public static void main(String[] args) {
		SpringApplication.run(applicationClass, args);
	}

}
