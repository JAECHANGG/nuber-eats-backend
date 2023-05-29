import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RestaurantResolver } from './restaurants.resolver';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantService } from './restaurants.service';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant])], // forFeature은 TypeOrmModule가 특정 feature를 import할 수 있게 해줌
  providers: [RestaurantResolver, RestaurantService],
})
export class RestaurantsModule {}
