Rails.application.routes.draw do

  resources :problems do
    collection do
      get  'search',           :action => 'search'
      post 'upload_template', :action => 'upload_template'
      post 'delete_template', :action => 'delete_template'
      post 'upload_spj',      :action => 'upload_spj'
      post 'delete_spj',      :action => 'delete_spj'
      post 'upload_data',     :action => 'upload_data'
      post 'delete_data',     :action => 'delete_data'
      post 'submit/:id',      :action => 'submit'     
    end
  end

  resources :vproblems do
    collection do
      get  'search',          :action => 'search'
      get  'respide/:id',     :action => 'respide'
      get  'respides',        :action => 'respides'
      post 'submit/:id',      :action => 'submit'     
    end
  end

  resources :items
  resources :solutions
  resources :problem_sets
  resources :problems
  resources :vproblems
  resources :submission_records 
  resources :homes
  resources :groups
  resources :discussions
  resources :comments
  resources :contests

  mount_devise_token_auth_for 'User', at: 'auth'
  mount ActionCable.server => '/cable'

end

