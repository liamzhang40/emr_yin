class ApplicationController < ActionController::API

  def login(user)
    token = JSONWebToken.encode(user_id: user.id)
    time = Time.now + 24.hours.to_i
    render json: {
      token: token,
      exp: time.strftime("%Y-%m-%dT%H:%M"),
      first_name: user.first_name,
      last_name: user.last_name,
    }
  end

  def require_login
    header = request.headers['Authorization']
    header = header.split(" ").last if header

    begin
      @decoded = JSONWebToken.decode(header)
      @current_user = User.find(@decoded[:user_id])
    rescue ActiveRecord::RecordNotFound => e
      render json: { errors: e.message }, status: 401
    rescue JWT::DecodeError => e
      render json: { errors: e.message }, status: 401
    end
  end
end
