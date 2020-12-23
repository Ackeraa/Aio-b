# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_12_23_150612) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "acm_contest_ranks", force: :cascade do |t|
    t.integer "submissions"
    t.integer "accepts"
    t.integer "time"
    t.jsonb "submission_info"
    t.bigint "contest_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["contest_id"], name: "index_acm_contest_ranks_on_contest_id"
    t.index ["user_id"], name: "index_acm_contest_ranks_on_user_id"
  end

  create_table "acm_contest_ranks_contests", force: :cascade do |t|
    t.bigint "contest_id", null: false
    t.bigint "acm_contest_rank_id", null: false
    t.index ["acm_contest_rank_id"], name: "index_acm_contest_ranks_contests_on_acm_contest_rank_id"
    t.index ["contest_id"], name: "index_acm_contest_ranks_contests_on_contest_id"
  end

  create_table "auth_permissions", force: :cascade do |t|
    t.string "name"
    t.integer "type_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "auth_permissions_users", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "auth_permission_id", null: false
    t.index ["auth_permission_id"], name: "index_auth_permissions_users_on_auth_permission_id"
    t.index ["user_id"], name: "index_auth_permissions_users_on_user_id"
  end

  create_table "comments", force: :cascade do |t|
    t.jsonb "description"
    t.jsonb "subdescription"
    t.integer "likes"
    t.bigint "problem_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["problem_id"], name: "index_comments_on_problem_id"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "contest_announcements", force: :cascade do |t|
    t.string "creater"
    t.string "name"
    t.text "description"
    t.boolean "visible"
    t.bigint "contest_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["contest_id"], name: "index_contest_announcements_on_contest_id"
  end

  create_table "contests", force: :cascade do |t|
    t.string "creater"
    t.string "name"
    t.text "description"
    t.date "start_time"
    t.date "end_time"
    t.string "rule_type"
    t.string "password"
    t.boolean "visible"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "contests_groups", force: :cascade do |t|
    t.bigint "contest_id", null: false
    t.bigint "group_id", null: false
    t.index ["contest_id"], name: "index_contests_groups_on_contest_id"
    t.index ["group_id"], name: "index_contests_groups_on_group_id"
  end

  create_table "contests_problems", force: :cascade do |t|
    t.bigint "contest_id", null: false
    t.bigint "problem_id", null: false
    t.index ["contest_id"], name: "index_contests_problems_on_contest_id"
    t.index ["problem_id"], name: "index_contests_problems_on_problem_id"
  end

  create_table "contribute_scores", force: :cascade do |t|
    t.string "action"
    t.integer "score"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "cost_scores", force: :cascade do |t|
    t.string "action"
    t.integer "score"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "events", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_events_on_user_id"
  end

  create_table "groups", force: :cascade do |t|
    t.string "creater"
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "groups_users", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "group_id", null: false
    t.index ["group_id"], name: "index_groups_users_on_group_id"
    t.index ["user_id"], name: "index_groups_users_on_user_id"
  end

  create_table "oi_contest_ranks", force: :cascade do |t|
    t.integer "submissions"
    t.integer "accepts"
    t.integer "time"
    t.jsonb "submission_info"
    t.bigint "contest_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["contest_id"], name: "index_oi_contest_ranks_on_contest_id"
    t.index ["user_id"], name: "index_oi_contest_ranks_on_user_id"
  end

  create_table "oi_contest_ranks_contests", force: :cascade do |t|
    t.bigint "contest_id", null: false
    t.bigint "oi_contest_rank_id", null: false
    t.index ["contest_id"], name: "index_oi_contest_ranks_contests_on_contest_id"
    t.index ["oi_contest_rank_id"], name: "index_oi_contest_ranks_contests_on_oi_contest_rank_id"
  end

  create_table "problem_sets", force: :cascade do |t|
    t.string "creater"
    t.string "name"
    t.text "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "problems", force: :cascade do |t|
    t.string "creater"
    t.string "name"
    t.text "description"
    t.text "input"
    t.text "output"
    t.text "hint"
    t.string "source"
    t.integer "time_limit"
    t.integer "memory_limit"
    t.string "difficulty"
    t.jsonb "tags"
    t.jsonb "samples"
    t.integer "data_id"
    t.jsonb "data_score"
    t.jsonb "allowed_languages"
    t.boolean "has_templete"
    t.jsonb "templete"
    t.boolean "has_spj"
    t.string "spj_language"
    t.text "spj_code"
    t.string "rule_type"
    t.boolean "is_visible"
    t.integer "submissions"
    t.integer "accepts"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "problems_problem_sets", force: :cascade do |t|
    t.bigint "problem_set_id", null: false
    t.bigint "problem_id", null: false
    t.index ["problem_id"], name: "index_problems_problem_sets_on_problem_id"
    t.index ["problem_set_id"], name: "index_problems_problem_sets_on_problem_set_id"
  end

  create_table "problems_tags", force: :cascade do |t|
    t.bigint "problem_id", null: false
    t.bigint "tag_id", null: false
    t.index ["problem_id"], name: "index_problems_tags_on_problem_id"
    t.index ["tag_id"], name: "index_problems_tags_on_tag_id"
  end

  create_table "problems_users", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "problem_id", null: false
    t.string "result"
    t.index ["problem_id"], name: "index_problems_users_on_problem_id"
    t.index ["user_id"], name: "index_problems_users_on_user_id"
  end

  create_table "solutions", force: :cascade do |t|
    t.jsonb "description"
    t.jsonb "subdescription"
    t.integer "likes"
    t.bigint "problem_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["problem_id"], name: "index_solutions_on_problem_id"
    t.index ["user_id"], name: "index_solutions_on_user_id"
  end

  create_table "submission_records", force: :cascade do |t|
    t.string "user_name"
    t.string "result"
    t.text "code"
    t.integer "memory_usage"
    t.integer "time_usage"
    t.integer "solution_size"
    t.date "submit_time"
    t.bigint "problem_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["problem_id"], name: "index_submission_records_on_problem_id"
  end

  create_table "tags", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "team_contest_ranks", force: :cascade do |t|
    t.integer "submissions"
    t.integer "accepts"
    t.integer "time"
    t.json "submission_info"
    t.bigint "contest_id", null: false
    t.bigint "team_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["contest_id"], name: "index_team_contest_ranks_on_contest_id"
    t.index ["team_id"], name: "index_team_contest_ranks_on_team_id"
  end

  create_table "team_contest_ranks_contests", force: :cascade do |t|
    t.bigint "contest_id", null: false
    t.bigint "team_contest_rank_id", null: false
    t.index ["contest_id"], name: "index_team_contest_ranks_contests_on_contest_id"
    t.index ["team_contest_rank_id"], name: "index_team_contest_ranks_contests_on_team_contest_rank_id"
  end

  create_table "teams", force: :cascade do |t|
    t.string "name"
    t.string "password"
    t.string "type"
    t.jsonb "member1"
    t.jsonb "member2"
    t.jsonb "member3"
    t.bigint "group_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["group_id"], name: "index_teams_on_group_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "provider", default: "email", null: false
    t.string "uid", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.boolean "allow_password_change", default: false
    t.datetime "remember_created_at"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.string "name"
    t.string "real_name"
    t.string "role"
    t.string "sno"
    t.string "major"
    t.string "motto"
    t.integer "score"
    t.string "image"
    t.string "email"
    t.text "tokens"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true
  end

  add_foreign_key "acm_contest_ranks", "contests"
  add_foreign_key "acm_contest_ranks", "users"
  add_foreign_key "acm_contest_ranks_contests", "acm_contest_ranks"
  add_foreign_key "acm_contest_ranks_contests", "contests"
  add_foreign_key "auth_permissions_users", "auth_permissions"
  add_foreign_key "auth_permissions_users", "users"
  add_foreign_key "comments", "problems"
  add_foreign_key "comments", "users"
  add_foreign_key "contest_announcements", "contests"
  add_foreign_key "contests_groups", "contests"
  add_foreign_key "contests_groups", "groups"
  add_foreign_key "contests_problems", "contests"
  add_foreign_key "contests_problems", "problems"
  add_foreign_key "events", "users"
  add_foreign_key "groups_users", "groups"
  add_foreign_key "groups_users", "users"
  add_foreign_key "oi_contest_ranks", "contests"
  add_foreign_key "oi_contest_ranks", "users"
  add_foreign_key "oi_contest_ranks_contests", "contests"
  add_foreign_key "oi_contest_ranks_contests", "oi_contest_ranks"
  add_foreign_key "problems_problem_sets", "problem_sets"
  add_foreign_key "problems_problem_sets", "problems"
  add_foreign_key "problems_tags", "problems"
  add_foreign_key "problems_tags", "tags"
  add_foreign_key "problems_users", "problems"
  add_foreign_key "problems_users", "users"
  add_foreign_key "solutions", "problems"
  add_foreign_key "solutions", "users"
  add_foreign_key "submission_records", "problems"
  add_foreign_key "team_contest_ranks", "contests"
  add_foreign_key "team_contest_ranks", "teams"
  add_foreign_key "team_contest_ranks_contests", "contests"
  add_foreign_key "team_contest_ranks_contests", "team_contest_ranks"
  add_foreign_key "teams", "groups"
end
