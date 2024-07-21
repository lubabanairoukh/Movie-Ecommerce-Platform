package hac.porducts;

import org.springframework.stereotype.Component;

import java.io.Serializable;

@Component
public class Product implements Serializable {
    private Long id;
    private String title;
    private String posterPath;
    private String releaseDate;
    private Float price;


    public Product(){

    }
    public Product(  Long id,
     String title,
     String posterPath,
     String releaseDate,
     Float price)
    {
        this.id=id;
        this.title=title;
        this.posterPath=posterPath;
        this.releaseDate=releaseDate;
        this.price=price;
    }
     public Long getId(){
        return this.id;
     }
     public void setId(Long id){
        this.id=id;
     }

     public String getTitle(){
        return this.title;
     }
     public void setTitle(String title){
        this.title=title;
     }
     public String getPosterPath(){
        return this.posterPath;
     }
     public void setPosterPath(String posterPath){
         this.posterPath=posterPath;
     }

     public String getReleaseDate(){
        return this.releaseDate;
     }

     public void setReleaseDate(String releaseDate){
         this.releaseDate=releaseDate;
     }

     public Float getPrice(){
        return this.price;
     }
     public void setPrice(Float price){
        this.price=price;
     }
}
