class Api::UsersController < ApplicationController
  before_action :require_login, except: [:create]

  def create
    @user = User.new(user_params)
    if @user.save
      login(@user)
      render 'api/users/show'
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def update
    @user = User.find(params[:id])
    if @user.update(user_params)
      render 'api/user/show'
    else 
      render json: @user.errors.full_messages, status: 422
    end
  end

  private

  def user_params
    params.require(:user).permit(
      :first_name, 
      :last_name,
      :username,
      :password,
    )
  end
end
