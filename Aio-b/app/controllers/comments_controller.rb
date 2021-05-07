class CommentsController < ApplicationController
  before_action :set_comment, only: [:show, :update, :destroy]

  # GET /comments
  def index
    @comments = Comment.hash_tree(limit_depth: 5)
    render json: comments_tree_for(@comments)
  end

  # GET /comments/1
  def show
    render json: @comment
  end

  def new
    @comment = Comment.new(parent_id: params[:parent_id])
    render json: @comment
  end

  # POST /comments
  def create
    if params[:parent_id].to_i > 0
      puts "FFFFFFFFFFF", params[:parent_id]
      parent = Comment.find_by_id(params.delete(:parent_id))
      @comment = parent.children.build(comment_params)
    else
      @comment = Comment.new(comment_params)
    end

    if @comment.save
      render json: @comment, status: :created, location: @comment
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /comments/1
  def update
    if @comment.update(comment_params)
      render json: @comment
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  # DELETE /comments/1
  def destroy
    @comment.destroy
  end

  private

    def comments_tree_for(comments)
      comments.map do |comment, nested_comments|
        {
          comment: comment,
          children: comments_tree_for(nested_comments) 
        }
      end
    end
    # Use callbacks to share common setup or constraints between actions.
    def set_comment
      @comment = Comment.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def comment_params
      params.permit(Comment.column_names - ['created_at', 'updated_at'])
    end
end
