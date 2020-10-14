package taxi.ride;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import taxi.ride.core.TaxiRide;

@RestController
public class TaxiRideController {

    @Autowired
    private IPricingService pricingService;

    @RequestMapping("taxi/ride")
    public Double price(@RequestBody TaxiRide taxiRide) {
        return pricingService.priceRide(taxiRide);
    }

}
