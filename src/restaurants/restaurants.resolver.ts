import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Restaurant } from './entities/restaurant.entity';

@Resolver((of) => Restaurant)
export class RestaurantResolver {
  @Query((returns) => [Restaurant])
  restaurants(@Args('veganOnly') veganOnly: boolean): Restaurant[] {
    return [];
  }

  // Mutation 방법 1
  // dto 파일에서 ArgsType로 전달해주면 Args name 생략 가능
  @Mutation((returns) => Boolean)
  createRestaurant(@Args() CreateRestaurantDto: CreateRestaurantDto): boolean {
    return true;
  }
}

// Mutation 방법 2
// @Mutation((returns) => Boolean)
// createRestaurant(
//   @Args('name') name: string,
//   @Args('isVegan') isVegan: boolean,
//   @Args('address') address: string,
//   @Args('ownerName') ownerName: string,
// ): boolean {
//   return true;
// }

// Mutation 방법 3
// @Mutation((returns) => Boolean)
//   createRestaurant(
//     @Args('createRestaurantInput') createRestaurantInput: CreateRestaurantDto,
//   ): boolean {
//     return true;
//   }
