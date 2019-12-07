package webservice.hszg.daniel.demo.image;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

// Schnittstelle zu der In-Memory-DB
@Repository
public interface ImageRepository extends CrudRepository<ImageEntity,Long> {

}
