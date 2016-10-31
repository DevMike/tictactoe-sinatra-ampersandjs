require 'sinatra'
require 'sinatra/sequel'
require 'sinatra/namespace'

# Establish the database connection; or, omit this and use the DATABASE_URL
# environment variable as the connection string:
set :database, 'sqlite://tictactoe.db'

# define database migrations. pending migrations are run at startup and
# are guaranteed to run exactly once per database.
migration "create players table" do
  database.create_table :players do
    primary_key :id
    String :name
    Integer :wins, default: 0
    Integer :draws, default: 0
    Integer :looses, default: 0
    index :name
  end
end

# a main model to work with
class Player < Sequel::Model
  plugin :json_serializer
end

# application class, API
class App < Sinatra::Base
  register Sinatra::Namespace

  get '/' do
    File.read(File.join('public', 'index.html'))
  end

  namespace '/api/v1' do

    def parsed_params
      request.body.rewind
      JSON.parse(request.body.read)
    end

    namespace '/people' do
      # get all players
      get '/' do
        Player.all.to_json
      end

      # create a player
      post '/' do
        Player.find_or_create(name: parsed_params['name']).to_json
      end

      # update a player
      put '/' do
        Player.find(name: parsed_params['name'])
          .update(parsed_params.select{|k, _| %w(wins looses draws).include?(k) })
          .to_json
      end
    end
  end
end
