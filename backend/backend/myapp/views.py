import json
from django.shortcuts import  render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
# from django.contrib.auth import authenticate,login,logout
import pymongo

client = pymongo.MongoClient("localhost", 27017)
db = client["FoodOrdering"]
collection1 = db["Foods"]
collection2 = db["Users"]
Products = collection1.find()
Users=collection2.find()

@csrf_exempt
def FoodPage(request):
    Foods = list(collection1.find())
    for i in Foods:
        i['_id']=str(i['_id'])
    # print(Foods)
    return JsonResponse(Foods,safe=False)

@csrf_exempt
def FilterPage(request,type):
    Foods = list(collection1.find({'type': type}))
    for i in Foods:
        i['_id']=str(i['_id'])
    # print(Foods)
    return JsonResponse(Foods,safe=False)

@csrf_exempt
def LoginUser(request):
    if request.method == 'GET':
        try:
            user_data = collection2.find_one({})
            if user_data:
                user_data['_id'] = str(user_data['_id'])
                return JsonResponse(user_data)
            else:
                return JsonResponse({'error': 'User data not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)
    
@csrf_exempt
def SignUpUser(request):
    if request.method == 'POST':
        try:
            email=request.POST.get('email')
            password=request.POST.get('password')
            collection2.insert_one({"email":email,"password":password})
            return JsonResponse({"message": "SignUp Successful"})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)

@csrf_exempt
def updateFood(request, product_id):
    if request.method == 'PATCH':
        try:
            id = {"id": product_id}
            data = {"$set": {"count": 1}}
            result = collection1.update_one(id, data)
            return JsonResponse({'message': 'Product updated successfully'})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=404)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)

@csrf_exempt
def incrementCount(request, product_id):
    if request.method == 'PATCH':
        try:
            id = {"id": product_id}
            data = {"$inc": {"count":1 }}  # Increment count by 1
            result = collection1.update_one(id, data)
            return JsonResponse({'message': 'Product count incremented successfully'})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=404)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)

@csrf_exempt
def decrementCount(request, product_id):
    if request.method == 'PATCH':
        try:
            id = {"id": product_id}
            data = {"$inc": {"count": -1}}  # Decrement count by 1
            result = collection1.update_one(id, data)
            return JsonResponse({'message': 'Product count decremented successfully'})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=404)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)

@csrf_exempt
def removeFood(request, product_id):
    if request.method == 'PATCH':
        try:
            id = {"id": product_id}
            data = {"$set": {"count": 0}}  # Decrement count by 1
            result = collection1.update_one(id, data)
            return JsonResponse({'message': 'Product count decremented successfully'})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=404)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)


@csrf_exempt
def checkOut(request):
    Foods = list(collection1.find())
    if request.method == 'PATCH':
        for i in Foods:
            collection1.update_one({"id": i['id']}, {"$set": {"count": 0}})
        return JsonResponse({'message': 'Product count set to zero successfully'})
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)
    # return JsonResponse(Foods,safe=False)