class Api::V1::FruitsController < ApplicationController
  def index
    data = [{
      name: 'John',
      occupation: 'Engineeer'
    }]

    render json: data
  end
end
