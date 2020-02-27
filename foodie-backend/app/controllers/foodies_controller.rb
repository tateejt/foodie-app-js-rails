class FoodiesController < ApplicationController
  before_action :set_foody, only: [:show, :update, :destroy]

  # GET /foodies
  def index
    foodies = Foodie.all
    render json: foodies
  end

  # GET /foodies/1
  def show
    render json: @foody
  end

  # POST /foodies
  def create
    @foody = Foodie.new(foody_params)

    if @foody.save
      render json: @foody, status: :created, location: @foody
    else
      render json: @foody.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /foodies/1
  def update
    if @foody.update(foody_params)
      render json: @foody
    else
      render json: @foody.errors, status: :unprocessable_entity
    end
  end

  # DELETE /foodies/1
  def destroy
    @foody.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_foody
      @foody = Foodie.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def foody_params
      params.require(:foody).permit(:description, :completed, :rating)
    end
end
