package webservice.hszg.daniel.demo.image;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;


// Behandlung der REST-Zugriffe
@RestController             // Klasse wird als Rest-Controller konfiguriert
@RequestMapping("image")    //  Pfad für die images Funktion
public class ImageRestController {

    @Autowired              // verbindet Interface mit dem REST-Controller
    private ImageRepository imgRepo; // Anlegen der In-Memory Datenbank

    @PostMapping("")        // Behandlung von POST-Anfragen mit Pfad
    public ResponseEntity<?> createImage(@RequestBody MultipartFile imageData) throws IOException {
        ImageEntity newImage = new ImageEntity(); //neues Bild wird angelegt
        newImage.setImagedaten(imageData.getBytes()); // Die Daten aus dem POST werden dem Image-Objekt per set zugewiesen
        imgRepo.save(newImage); // Das Bild wird in der Datenbank gespeichert
        return ResponseEntity.status(HttpStatus.CREATED).body(newImage); // Die Antwort zu dem POST wird festgelegt bei Erfolg als 201 und das Bild-Objekt wird zurückgegeben
    }

    @GetMapping("real-image/{getId}") // Behandlung Get für das jpeg-Bild
    public ResponseEntity<?> getImage(@PathVariable Long getId){ // die ID aus der GET-Anfrage wird benötigt
        Optional<ImageEntity> imageoptional = imgRepo.findById(getId); // Sucht aus der DB das Bild anhand der ID heraus
        //imageoptional.isPresent() zur Überprüfung ob das Image wirklich vorhanden ist
        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(imageoptional.get().getImagedaten());// Antwort der GET-Anfrage: Http code und das Jpeg wird gesendet
    }

    @GetMapping("{getId}") // Behandlung Get für das Json des Bild-Objektes
    public ResponseEntity<?> getImageJson(@PathVariable Long getId){
        Optional<ImageEntity> imageoptional = imgRepo.findById(getId); // Sucht aus der DB das Bild anhand der ID heraus
        return  ResponseEntity.ok(imageoptional.get()); // Gibt die Inhalte der Datenfelder als Json als Antwort zurück
    }

}
