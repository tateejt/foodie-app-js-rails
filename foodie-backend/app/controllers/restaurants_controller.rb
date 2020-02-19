class RestaurantsController < ApplicationController
  def index
    restaurants = Restaurants.all

    render json: RestaurantS
  end

end
