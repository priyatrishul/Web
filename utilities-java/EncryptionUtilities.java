/* Comment out the package statement to generate a password file, put it 
back for the web app 
Alan Riggins
Spring 2014, CS645
*/

//package edu.sdsu.cs645.server;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import sun.misc.BASE64Encoder;
import java.util.*;
import java.io.*;

public class EncryptionUtilities {
    public static final String ALGORITHM = "SHA";
    public static final String ENCODING = "UTF-8";
    private static String filename = "passwords.dat";
    
    public static void setFilename(String s) {
        filename = s;
        }
    
    public static synchronized String encrypt(String plaintext)  {
        MessageDigest msgDigest = null;
        String encryptedPassword = null;
        try {
            msgDigest = MessageDigest.getInstance(ALGORITHM);
            msgDigest.update(plaintext.getBytes(ENCODING));
            byte b [] = msgDigest.digest();
            encryptedPassword = (new BASE64Encoder()).encode(b);
            }
        catch (NoSuchAlgorithmException e) {}
        catch (UnsupportedEncodingException e) {}
        return encryptedPassword;
    }
    
    private static boolean doesMatch(
        String enteredPassword, String encryptedPassword) {    
        return encryptedPassword.equals(EncryptionUtilities.encrypt(enteredPassword));
        }
        
    public static boolean isValid(String username, String password) {
        try {
            String encryptedPassword = EncryptionUtilities.encrypt(password);
            Properties p = new Properties();
            FileInputStream in = new FileInputStream(filename);
            p.load(in);
            in.close();
            if(p.getProperty(username).equals(encryptedPassword))
                return true;
            }
        catch(NullPointerException excpt) {
            return false;
            }
        catch(Exception e) {
            e.printStackTrace();
            }
            return false;
        }    
        
    public static boolean addEntryToPasswordFile(String username, String password) {
        try {
            Properties p = new Properties();
            FileInputStream in = new FileInputStream(filename);
            p.load(in);
            in.close();
            String encryptedPassword = EncryptionUtilities.encrypt(password);
            p.setProperty(username, encryptedPassword);
            
            FileOutputStream out = new FileOutputStream(filename);
            p.store(out, "password file");
            out.close();
            return true;
            }
        catch(Exception e) {
            e.printStackTrace();
            return false;
            }
        }
        
    public static void main(String [] args) {
        EncryptionUtilities.addEntryToPasswordFile("cs645","sp2015");
        EncryptionUtilities.addEntryToPasswordFile("ariggins","123"); 
        if(EncryptionUtilities.isValid("cs645","sp2015"))
            System.out.println("The cs645 password is valid");
        else
            System.out.println("OOPS, it's not valid");
        }

}
