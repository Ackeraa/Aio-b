Rails.application.routes.draw do

  resources :items
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

  post 'problems/upload_template' => 'problems#upload_template'
  post 'problems/delete_template' => 'problems#delete_template'

  post 'problems/upload_spj' => 'problems#upload_spj'
  post 'problems/upload_data' => 'problems#upload_data'

end

