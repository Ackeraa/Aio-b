Rails.application.routes.draw do
  resources :submission_records
  resources :solutions
  resources :problem_sets
  resources :problems
  resources :homes
  resources :groups
  resources :discussions
  resources :comments
  resources :contests
  mount_devise_token_auth_for 'User', at: 'auth'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
