Rails.application.routes.draw do

  resources :contests do
    collection do
      get 'search',                             :action => 'search'
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

  resources :groups do
    collection do
      get  'search',                      :action => 'search'
      get ':id/add_group/:group_id',        :action => 'add_group'     
      get ':id/delete_group/:group_id',     :action => 'delete_group'     
    end
  end
  resources :acm_contest_ranks do
    collection do
      get  'search',                      :action => 'search'
      get 'get_contest_rank', :action => 'get_contest_rank'
    end
  end

  resources :submission_records do
    collection do
      get  'search',                      :action => 'search'
    end
  end

  resources :contests
  get 'comments/new/(:parent_id)', to: 'comments#new', as: :new_comment

  resources :items
  resources :solutions
  resources :problems
  resources :vproblems
  resources :homes
  resources :discussions
  resources :comments

  mount_devise_token_auth_for 'User', at: 'auth'
  mount ActionCable.server => '/cable'

end

