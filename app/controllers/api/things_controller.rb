class V1::ThingsController < ApplicationController
  def index
    render json: { things: [
      {
        name: 'some-thing',
        guid: '9900-5340-rt423'
      }
    ] }.to_json
  end
end
