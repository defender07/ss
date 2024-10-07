const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
    items: [
      {
        teamId: {
          type: mongoose.Schema.Types.ObjectId,
          refPath: 'items.teamType', // Refer to either 'DecorationTeam', 'CateringTeam', or 'VenueTeam'
          required: true,
        },
        teamType: {
          type: String,
          required: true,
        },
        teamName: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt fields
);

module.exports = mongoose.model('Cart', cartSchema);
