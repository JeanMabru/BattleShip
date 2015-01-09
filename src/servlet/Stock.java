package servlet;

import org.json.simple.JSONArray;

public class Stock {
	private static JSONArray  Message;

	public static JSONArray getMessage() {
		System.out.println("Message get "+Message);
		return Message;
	}

	public static void setMessage(JSONArray message) {
		Message = message;
		System.out.println("message set "+Message);
	}
}
