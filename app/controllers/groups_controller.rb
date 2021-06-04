class GroupsController < ApplicationController
  before_action :set_group, only: [:show, :update, :destroy, :get_info,
                                   :get_members, :get_contests, :get_problem_sets]
  before_action :set_page, only: [:search]
  #before_action :authenticate_user!, only: [:get_my_groups]

  # GET /groups
  def index
    @groups = Group.all
    render json: @groups
  end

  # GET /groups/search
  def search
    query = params[:query]
    total = Group.where('name ilike(?)',  "%#{query}%").count
    @groups = Group.where('name ilike(?)',  "%#{query}%").limit(20).offset(@page * 20)
    render json: { total: total, groups: @groups.to_json }
  end

  # GET /groups/1/get_info
  def get_info
    leader = GroupUser.find_by(group_id: params[:id], role: 'leader').user
    total_members = @group.users.count
    total_contests = @group.contests.count
    total_problem_sets = @group.problem_sets.count
    
    render json: {
      leader: leader.to_json,
      total_members: total_members,
      total_contests: total_contests,
      total_problem_sets: total_problem_sets
    }
  end

  # GET /groups/get_my_groups
  def get_my_groups
    groups = Group.all
    render json: groups
  end

  # GET /groups/1/members
  def get_members
    render json: @group.users 
  end

  # GET /groups/1/contests
  def get_contests
    render json: @group.contests
  end

  # GET /groups/1/problem_sets
  def get_problem_sets
    render json: @group.problem_sets
  end

  # GET /groups/1
  def show
    render json: @group
  end

  # POST /groups
  def create
    @group = Group.new(group_params)

    if @group.save
      render json: @group, status: :created, location: @group
    else
      render json: @group.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /groups/1
  def update
    if @group.update(group_params)
      render json: @group
    else
      render json: @group.errors, status: :unprocessable_entity
    end
  end

  # DELETE /groups/1
  def destroy
    @group.destroy
  end

  private

    def set_page
      @page = (params[:page] || 1).to_i - 1
    end

    def set_group
      @group = Group.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def group_params
      params.fetch(:group, {})
    end
end
