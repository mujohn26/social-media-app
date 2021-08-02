Rails.application.routes.draw do
  root 'pages#index'
  get '/users', to: 'users#index'
  match '*path', to: 'pages#index', via: :all
  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
