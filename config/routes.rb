Rails.application.routes.draw do
  post 'auth_user' => 'authentication#authenticate_user'
  root 'pages#index'
  get '/users', to: 'users#index'
  post '/auth/signup', to: 'users#create'
  match '*path', to: 'pages#index', via: :all
  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
