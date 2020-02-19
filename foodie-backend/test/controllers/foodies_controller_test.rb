require 'test_helper'

class FoodiesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @foody = foodies(:one)
  end

  test "should get index" do
    get foodies_url, as: :json
    assert_response :success
  end

  test "should create foody" do
    assert_difference('Foodie.count') do
      post foodies_url, params: { foody: { completed: @foody.completed, description: @foody.description } }, as: :json
    end

    assert_response 201
  end

  test "should show foody" do
    get foody_url(@foody), as: :json
    assert_response :success
  end

  test "should update foody" do
    patch foody_url(@foody), params: { foody: { completed: @foody.completed, description: @foody.description } }, as: :json
    assert_response 200
  end

  test "should destroy foody" do
    assert_difference('Foodie.count', -1) do
      delete foody_url(@foody), as: :json
    end

    assert_response 204
  end
end
