import os

#The Main function of the moudlue.
#Can Delete String in one file or run on all files in folders and delete a string inside.
def Delete(File_Name, StringToBeDelted):

    print("Delete Script Activated:\n")

   


    #Test for which operation: change on file or running on all files.
    operation = File_Name.find('*')
   


    #Case delete a string in one file
    if( operation == -1 ):

        #check if there is a file with this name in the folder.
        file_located = os.path.isfile(File_Name)

        if(file_located == False):
            print("File not Found.\n")
            exit()

        #if file located or the target is to run and delete string in all files
        ChangeSingleFile(File_Name,StringToBeDelted)
        

    #if file located or the target is to run and delete string in all files
    else:
        RunOnAllFile(StringToBeDelted)
        




def RunOnAllFile(StringToBeDelted):
    print("RunOnAllFile Function Activated.\n")

    for filename in os.listdir('.'):
        if(filename.lower().endswith('.html')):
            ChangeSingleFile(filename,StringToBeDelted)
    
    


def ChangeSingleFile(file_name,StringToBeDelted):
        print("ChangeSingleFile Function Activated on {}.\n".format(file_name))
        test_if_string_exists_and_delete(file_name,StringToBeDelted)



def test_if_string_exists_and_delete(file_name,StringToBeDelted):

    does_string_exsists = False
    

    print("Test if string exsists:\n")

    with open(file_name) as target_file:
     if StringToBeDelted in target_file.read():
        print("string_exsists.\n")
        does_string_exsists = True
    
    if(does_string_exsists):
        #read input file
        fin = open(file_name, "rt")
        #read file contents to string
        data = fin.read()
        #replace all occurrences of the required string
        data = data.replace(StringToBeDelted, '')
        #close the input file
        fin.close()
        #open the input file in write mode
        fin = open(file_name, "wt")
        #overrite the input file with the resulting data
        fin.write(data)
        #close the file
        fin.close()
        print("Text deleted.\n")

    else:
        print("Text does not exsist in file, program exit.\n")
        exit()


        




if __name__ == "__main__":

    File_Name = "*" #input("Enter file name to be deleted or press * for whole files in folder:")
    StringToBeDelted = "StringToBeDelted" #input("Enter the string you want to delete:")

    Delete(File_Name, StringToBeDelted)