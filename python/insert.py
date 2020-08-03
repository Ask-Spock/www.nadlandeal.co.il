import os

#The Main function of the moudlue.
#Can Update String in one file or run on all files in folders and Update a string inside.
def Insert(File_Name, Location_In_File, New_Inserted_String):

    print("Insert Script Activated:\n")
    print("The following String will be Inserted {} \n".format(New_Inserted_String))

    

    #Test for which operation: change on file or running on all files.
    operation = File_Name.find('*')
   


    #Case Insert a string in one file
    if( operation == -1 ):

        #check if there is a file with this name in the folder.
        file_located = os.path.isfile(File_Name)

        if(file_located == False):
            print("File not Found.\n")
            exit()

        #if file located or the target is to run and Update string in all files
        ChangeSingleFile(File_Name, Location_In_File, New_Inserted_String)
        

    #if file located or the target is to run and Update string in all files
    else:
        RunOnAllFile(Location_In_File,New_Inserted_String)
        




def RunOnAllFile(Location_In_File, New_Inserted_String):
    print("RunOnAllFile Function Activated.\n")

    for filename in os.listdir('.'):
        if(filename.lower().endswith('.html')):
            ChangeSingleFile(filename, Location_In_File,New_Inserted_String )
    
    


def ChangeSingleFile(file_name, Location_In_File, New_Inserted_String):
        print("ChangeSingleFile Function Activated on {}.\n".format(file_name))
        Insert_Into_Location(file_name, Location_In_File, New_Inserted_String)



def Insert_Into_Location(file_name, Location_In_File, New_Inserted_String):

    #read input file
    fin = open(file_name, "rt")
    #read file contents to string
    data = fin.read()
    #replace all occurrences of the required string
    data = data.replace(Location_In_File, New_Inserted_String)
    #close the input file
    fin.close()
    #open the input file in write mode
    fin = open(file_name, "wt")
    #overrite the input file with the resulting data
    fin.write(data)
    #close the file
    fin.close()
    print("File Updated.\n")

        




if __name__ == "__main__":

    File_Name = "*" #input("Enter file name to be Updated or press * for whole files in folder:")
    Location_In_File = "</head>" #input("Enter the string you want to Update:")
    New_Inserted_String = "Hey Hey I am new here 2/9/2020 10:28" + Location_In_File #input("Enter the new string you want to Insert:")

    Insert(File_Name, Location_In_File, New_Inserted_String)