import tensorflow as tf
from keras.utils import plot_model
from keras.models import load_model
cnn_model = load_model('cnn_model.h5')
lstm_model = load_model('lstm_model.h5')

plot_model(cnn_model, show_shapes=True, to_file='cnn.png')
plot_model(lstm_model, show_shapes=True, to_file='lstm.png')