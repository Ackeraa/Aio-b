Rails.application.routes.draw do

  resources :contests do
    collection do
      get ':id/problems',                       :action => 'problems'     
      get ':id/add_problem/:problem_id',        :action => 'add_problem'     
      get ':id/delete_problem/:problem_id',     :action => 'delete_problem'     
    end
  end

  resources :problems do
    collection do
      get  'search',          :action => 'search'
      post 'upload_template', :action => 'upload_template'
      post 'delete_template', :action => 'delete_template'
      post 'upload_spj',      :action => 'upload_spj'
      post 'delete_spj',      :action => 'delete_spj'
      post 'upload_data',     :action => 'upload_data'
      post 'delete_data',     :action => 'delete_data'
      post ':id/submit',      :action => 'submit'     
    end
  end

  resources :vproblems do
    collection do
      get  'search',          :action => 'search'
      get  ':id/respide',     :action => 'respide'
      get  'respides',        :action => 'respides'
      post ':id/submit',      :action => 'submit'     
    end
  end


  resources :problem_sets do
    collection do
      get  'search',                            :action => 'search'
      get ':id/problems',                       :action => 'problems'     
      get ':id/add_problem/:problem_id',        :action => 'add_problem'     
      get ':id/delete_problem/:problem_id',     :action => 'delete_problem'     
    end
  end

  resources :users do
    collection do
      get  'search',                      :action => 'search'
      get ':id/add_user/:user_id',        :action => 'add_user'     
      get ':id/delete_user/:user_id',     :action => 'delete_user'     
    end
  end

  resources :items
  resources :solutions
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

