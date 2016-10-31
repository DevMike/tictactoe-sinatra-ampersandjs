ENV['RACK_ENV'] = 'test'

require 'test/unit'
require 'rack/test'
require '../app'

class AppTest < Test::Unit::TestCase
  include Rack::Test::Methods

  def teardown
    Player.all.map(&:delete)
  end

  def app
    App
  end

  def route_namespace
    '/api/v1/people/'
  end

  def test_it_returns_players
    Player.create(name: 'Ivan')

    get route_namespace

    assert last_response.ok?
    assert_equal Player.all.to_json, last_response.body
  end

  def test_it_creates_player
    post route_namespace, { name: 'John' }.to_json

    assert last_response.ok?
    assert_equal Player.count, 1
    assert_equal Player.first.name, 'John'
    assert_equal last_response.body, Player.first.to_json
  end

  def test_it_updates_player
    player = Player.create(name: 'Ivan')
    updated_attributes = { draws: 1, looses: 2, wins: 3 }

    put route_namespace, updated_attributes.merge(name: player.name).to_json

    assert last_response.ok?
    assert_equal Player.count, 1
    updated_attributes.each_pair do |attr, value|
      assert_equal player.reload[attr], value
    end
    assert_equal last_response.body, player.to_json
  end
end
