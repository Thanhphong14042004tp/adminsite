const Trip = require('../models/trips'); // Giả sử bạn có model Trip

// Lấy tất cả chuyến đi
exports.getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find();
    res.render('index', { trips }); // Giả sử bạn có view index.ejs để hiển thị danh sách chuyến đi
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching trips');
  }
};

// Form thêm chuyến đi
exports.addTripForm = (req, res) => {
  res.render('addTrip'); // Hiển thị form thêm chuyến đi
};

// Thêm chuyến đi mới
exports.addTrip = async (req, res) => {
  const { name, from, to, departureTime } = req.body;
  try {
    const newTrip = new Trip({ name, from, to, departureTime });
    await newTrip.save();
    req.flash('success', 'Chuyến đi đã được thêm thành công!');
    res.redirect('/trips');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding trip');
  }
};

// Form sửa chuyến đi
exports.editTripForm = async (req, res) => {
  const tripId = req.params.id;
  try {
    const trip = await Trip.findById(tripId);
    if (!trip) {
      req.flash('error', 'Chuyến đi không tồn tại');
      return res.redirect('/trips');
    }
    res.render('editTrip', { trip }); // Hiển thị form sửa chuyến đi
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching trip details');
  }
};

// Cập nhật chuyến đi
exports.editTrip = async (req, res) => {
  const tripId = req.params.id;
  const { name, from, to, departureTime } = req.body;
  try {
    await Trip.findByIdAndUpdate(tripId, { name, from, to, departureTime });
    req.flash('success', 'Chuyến đi đã được cập nhật!');
    res.redirect('/trips');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating trip');
  }
};

// Xóa chuyến đi
exports.deleteTrip = async (req, res) => {
  const tripId = req.params.id;
  try {
    await Trip.findByIdAndDelete(tripId);
    req.flash('success', 'Chuyến đi đã được xóa!');
    res.redirect('/trips');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting trip');
  }
};
