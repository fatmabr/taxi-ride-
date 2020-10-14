package taxi.ride;

import org.springframework.stereotype.Service;
import taxi.ride.core.TaxiRide;

import static java.time.LocalDateTime.parse;
import static java.time.format.DateTimeFormatter.ISO_DATE_TIME;

@Service
public class PricingService implements IPricingService {

    @Override
    public Double priceRide(TaxiRide taxiRide) {
        double initialPrice = 1d;

        double unitPrice = getRideUnitPrice(taxiRide);

        return initialPrice + taxiRide.getDistance() / ((1 / 5d) * unitPrice);

    }

    private double getRideUnitPrice(TaxiRide taxiRide) {

        int hour;
        hour = parse(taxiRide.getStartTime(), ISO_DATE_TIME).getHour();

        double unitPrice = 0.5d;
        if (hour > 20 || hour < 6) {
            unitPrice += 0.5d;
        } else if (hour > 16 && hour < 19) {
            unitPrice += 1d;
        }
        return unitPrice;
    }
}
