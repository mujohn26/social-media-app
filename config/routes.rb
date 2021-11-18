Rails.application.routes.draw do

  post 'auth_user' => 'authentication#authenticate_user'
  root 'pages#index'
  get '/users', to: 'users#index'
  post '/api/auth/signup', to: 'users#create'
  post '/api/auth/login', to: 'authentication#authenticate_user'
  get '/api/auth/cookie', to: 'authentication#get_cookie'
  post '/api/auth/forgot', to: 'passwords#forgot'
  patch '/api/auth/reset', to: 'passwords#reset'
  post '/api/posts', to: 'posts#create'
  get '/api/posts', to: 'posts#index'
  match '*path', to: 'pages#index', via: :all

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
