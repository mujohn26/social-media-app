Rails.application.routes.draw do
  devise_for :users
  # , skip: {registrations:"registrations", sessions:"sessions"}
  devise_scope :user do
    post 'sign_up', to: 'users/registrations#create'
    post 'sign_in', to: 'users/sessions#create'
    post 'forgot', to: 'users/passwords#create'
    patch 'reset', to: 'users/passwords#reset'
  end
  post 'auth_user' => 'authentication#authenticate_user'
  root 'pages#index'
  get '/users', to: 'users#index'
  # post '/api/auth/signup', to: 'users#create'
  # post 'sign_up', to: 'users#create'
  post '/api/auth/login', to: 'authentication#authenticate_user'
  get '/api/auth/cookie', to: 'authentication#get_cookie'
  post '/api/auth/forgot', to: 'passwords#forgot'
  patch '/api/auth/reset', to: 'passwords#reset'
  post '/api/posts', to: 'posts#create'
  get '/api/posts', to: 'posts#index'
  match '*path', to: 'pages#index', via: :all

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
