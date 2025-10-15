from flask import Flask, request, jsonify
from flask_cors import CORS
from ultralytics import YOLO
from PIL import Image
import io
import json

# ------------------ Flask Setup ------------------
app = Flask(__name__)
CORS(app)

# ------------------ Load YOLO Model ------------------
# You can use YOLOv8 pretrained on COCO or custom trained for food detection
model = YOLO("yolo11n.pt")  # yolov8n.pt is small and fast; replace with custom food model if available

# ------------------ Function: Detect Food ------------------
def detect_food(image_bytes):
    try:
        # Load image from bytes
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        results = model.predict(source=image, verbose=False)[0]  # Predict

        # Extract detected class names
        detected_classes = []
        for box in results.boxes:
            cls_id = int(box.cls[0])
            label = model.names[cls_id]  # Get class name
            detected_classes.append(label)

        return detected_classes
    except Exception as e:
        print(f"Error detecting food with YOLO: {e}")
        return []

# ------------------ Route: Get Recipes ------------------
@app.route("/get_recipes", methods=["POST"])
def get_recipes():
    try:
        # Parse ingredients from form
        ingredients_json = request.form.get("ingredients")
        ingredients = json.loads(ingredients_json) if ingredients_json else []

        detected_ingredients = []

        # Read image from request
        image_file = request.files.get("image")
        if image_file:
            image_bytes = image_file.read()
            detected_ingredients = detect_food(image_bytes)
            print(f"✅ Detected food items from image: {detected_ingredients}")
        else:
            print("⚠️ No image received from frontend.")

        print(f"📦 Ingredients received from form: {ingredients}")
        di=[]
        z=['apple','banana','orange','grape','watermelon','pineapple','strawberry','blueberry','kiwi','mango','peach','pear','plum','cherry','raspberry','blackberry','coconut','lemon','lime','tangerine','apricot','fig','pomegranate','cantaloupe','honeydew','papaya','dragonfruit','passionfruit','potato','tomato','carrot','broccoli','cauliflower','spinach','lettuce','cabbage','kale','arugula','celery','cucumber','zucchini','eggplant','bell pepper','chili pepper','onion','garlic','ginger','mushroom','corn','peas','beans','lentils','rice','quinoa','oats','barley','wheat','bread','pasta','noodles','flour','sugar','salt','pepper','olive oil','butter','cheese','milk','yogurt','cream','eggs','chicken','beef','pork','lamb','fish']
        for i in detected_ingredients:
            if i not in di and i in z and i not in ingredients:
                di.append(i)
        for i in ingredients:
                di.append(i)
        print(f"🍽️ Final detected ingredients: {di}"   )
        return jsonify({
            "detected_ingredients": di
        })

    except Exception as e:
        print("❌ Error in /get_recipes:", e)
        return jsonify({"error": str(e)}), 500

# ------------------ Run Flask App ------------------
if __name__ == "__main__":
    app.run(debug=True)
