class FoodieSerializer < ActiveModel::Serializer
  attributes :id, :description, :completed
end
