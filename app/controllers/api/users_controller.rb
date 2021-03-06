class Api::UsersController < ApplicationController
  before_action :require_login, except: [:create]

  def create
    @user = User.new(user_params)
    if @user.save
      login(@user)
    else
      render json: @user.errors, status: 422
    end
  end

  def update
    @user = User.find(params[:id])
    if @user.update(user_params)
      render 'api/user/show'
    else 
      render json: @user.errors, status: 422
    end
  end

  def index
    @users = User.all
    render 'api/users/index'
  end

  private

  def user_params
    params.require(:user).permit(
      :first_name, 
      :last_name,
      :email,
      :password,
    )
  end
end
