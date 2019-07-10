class Api::AuthenticationController < ApplicationController
    before_action :require_login, except: [:create]

  def create
    @user = User.find_by_credentials(
      params[:user][:email],
      params[:user][:password]
    )

    if @user
      login(@user)
    else
      render json: ['Wrong Credentials'], status: 401
    end
  end

  def profile
    @user = @current_user
    render 'api/users/show'
  end

  private

  def auth_params
    params.require(:user).permit(
      :email,
      :password,
    )
  end
end
