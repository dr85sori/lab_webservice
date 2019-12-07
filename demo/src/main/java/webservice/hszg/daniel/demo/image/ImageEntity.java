package webservice.hszg.daniel.demo.image;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Set;


// Bilderklasse deren Objekte in der In-Memory-DB gehalten werden
@Entity
public class ImageEntity {
    @Id
    @GeneratedValue
    private Long id;   // eindeutige Referenz zum Bild
    @Lob
    @JsonIgnore
    private byte[] imagedaten; // Bild in Bytes

    @ManyToOne
    private Set<ImageComment> imageComments; // Sammlung von Kommentaren Set rausnehmen

    private int likes;   // Anzahl Daumen-hoch
    private int dislikes; // Anzahl Daumen-runter

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }



    public byte[] getImagedaten() {
        return imagedaten;
    }

    public void setImagedaten(byte[] imagedaten) {
        this.imagedaten = imagedaten;
    }

    public Set<ImageComment> getImageComments() {
        return imageComments;
    }

    public void setImageComments(Set<ImageComment> imageComments) {
        this.imageComments = imageComments;
    }

    public int getLikes() {
        return likes;
    }

    public void setLikes(int likes) {
        this.likes = likes;
    }

    public int getDislikes() {
        return dislikes;
    }

    public void setDislikes(int dislikes) {
        this.dislikes = dislikes;
    }

}
