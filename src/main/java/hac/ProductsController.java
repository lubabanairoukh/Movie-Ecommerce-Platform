package hac;

import hac.porducts.Product;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.*;

import java.text.DecimalFormat;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/products")
public class ProductsController {
    @Resource
    private List<Product> products;
    @PostMapping("/")
    public boolean addProduct(@RequestBody Product product) {

        for (Product p : products) {
            if (Objects.equals(p.getId(), product.getId())) {
                return false;
            }
        }
        return products.add(product);
    }

    @GetMapping("/")
    public List<Product> showPurchases() {
        return products;
    }

    @DeleteMapping("/{id}")
    public boolean deleteProduct(@PathVariable Long id) {

        for (Product p : products) {
            if (Objects.equals(id, p.getId())) {
                return products.remove(p);
            }
        }
        return false;
    }
    @DeleteMapping("/")
    public String clearSession(HttpServletRequest request) {

        // Destroy session
        HttpSession session = request.getSession();
        session.invalidate(); // Destroy session
        products.clear(); // Make the ArrayList empty
        return "Session cleared and products list emptied";
    }

    @GetMapping("/total-price")
    public String calculateTotalPrice() {
        double totalPrice = 3.99 * products.size();

        DecimalFormat decimalFormat = new DecimalFormat("#.###");
        return decimalFormat.format(totalPrice);
    }



}
