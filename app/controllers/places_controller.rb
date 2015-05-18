class PlacesController < ApplicationController
	def create
		@place = Place.create(place_params)
	end

	def index
		@places = Place.all
	end

private

	def place_params
		params.require(:place).permit(:name, :day, :time, :location_name, :location_comment, :address, :city)
	end
end
