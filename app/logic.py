import sqlite3

def get_queue(course_id) {
  # help
  pass
}

def add_to_queue(queue_id, user_id) {
  pass
}

def remove_from_queue(queue_id, user_id) {
  pass
}

def get_user(net_id, class_name):
    user = User.query.filter_by(net_id=net_id).filter_by(class_name=class_name).first_or_404()
    return render_template('show_user.html', user=user)