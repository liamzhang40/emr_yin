Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: {format: :json} do
    # Login route
    post '/auth/login', to: 'authentication#create'
    get '/auth/profile', to: 'authentication#profile'
    
    resources :users, only: [:create, :update, :index, :show]
    resources :patients, only: [:create, :update, :index, :show, :destroy] do 
      resources :visits, only: [:index]
    end
    resources :visits, only: [:create, :update, :show, :destroy]

  end
end
